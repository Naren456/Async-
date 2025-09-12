// utils/icsParser.ts
import ICAL from "ical.js";

/** Assignment type */
export type Assignment = {
  id: string;
  title: string;
  subject: string;
  link: string;
  isoDate: string;      // ISO datetime string (used for sorting/filtering)
  displayDate: string;  // Formatted date for UI: "dd-MMM-yyyy hh:mm AM/PM"
};

/** Grouped assignments type */
export type GroupedAssignments = Record<string, Assignment[]>;

/** --- Helper: Format Date + Time to dd-MMM-yyyy hh:mm AM/PM --- */
function formatDateTimeToDisplay(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-US", options).replace(",", "");
}

/** --- Helper: Combine date + time strings to Date object --- */
function parseDateTime(dateStr: string, timeStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute);
}

/** --- Get ICS URL by cohort --- */
export function getICSUrl(cohort: number): string | null {
  const urls: Record<number, string> = {
    4: "https://www.coursera.org/api/rest/v1/learnercalendars/161781597/f9aaba6b-7b8f-483d-b60e-d619429327a1",
    6: "https://www.coursera.org/api/rest/v1/learnercalendars/188822892/bbc0b1b4-9a1f-4e0b-b6c0-bdd688246cf7",
  };
  console.log(urls[cohort])
  return urls[cohort] ?? null;
}

/** --- Parse ICS text to Assignment[] --- */
export function parseICSText(text: string): Assignment[] {
  const jcalData = ICAL.parse(text);
  const comp = new ICAL.Component(jcalData);
  const events = comp.getAllSubcomponents("vevent");

  // Only assignment-like events
  const assignmentEvents = events.filter((event) => {
    const vevent = new ICAL.Event(event);
    const desc = vevent.description || "";
    return /you have \d+ item[s]? due/i.test(desc);
  });

  return assignmentEvents.map((event, idx) => {
    const vevent = new ICAL.Event(event);
    const dueDateObj = vevent.startDate.toJSDate();

    const lines = (vevent.description || "")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const summaryParts = (vevent.summary || "").split("--");
    const subject = summaryParts[1]?.trim() || summaryParts[0]?.trim() || "Unknown Subject";

    const link = lines.find((l) => l.startsWith("http")) || "";

    const titleLineIndex = lines.findIndex((l) =>
      /you have \d+ item[s]? due/i.test(l)
    );
    const title =
      (titleLineIndex !== -1 && lines[titleLineIndex + 1]
        ? lines[titleLineIndex + 1].replace(/^- /, "").trim()
        : vevent.summary) || "Untitled Assignment";

    return {
      id: vevent.uid || idx.toString(),
      title,
      subject,
      link,
      isoDate: dueDateObj.toISOString(),                  // for sorting/filtering
      displayDate: formatDateTimeToDisplay(dueDateObj),  // for UI
    };
  });
}

/** --- Filter upcoming assignments within next N days --- */
export function filterUpcomingAssignments(assignments: Assignment[], days = 90): Assignment[] {
  const now = new Date();
  const end = new Date();
  end.setDate(now.getDate() + days);

  return assignments
    .filter(a => {
      const dt = new Date(a.isoDate);
      return dt >= now && dt <= end;
    })
    .sort((a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime());
}

/** --- Group assignments by displayDate --- */
export function groupAssignmentsByDate(assignments: Assignment[]): GroupedAssignments {
  const grouped: GroupedAssignments = {};

  assignments.forEach(a => {
    if (!grouped[a.displayDate]) grouped[a.displayDate] = [];
    grouped[a.displayDate].push(a);
  });

  // Sort groups by first assignment datetime
  return Object.fromEntries(
    Object.entries(grouped).sort(
      ([, a1], [, a2]) => new Date(a1[0].isoDate).getTime() - new Date(a2[0].isoDate).getTime()
    )
  );
}

/** --- Fetch ICS → Parse → Filter → Group --- */
export async function fetchUpcomingAssignmentsGrouped(cohort = 6, days = 90): Promise<GroupedAssignments> {
  try {
    const url = getICSUrl(cohort);
    console.log(url)
    if (!url) return {};

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch ICS");

    const text = await response.text();
    const parsed = parseICSText(text);
    const upcoming = filterUpcomingAssignments(parsed, days);
    return groupAssignmentsByDate(upcoming);
  } catch (err) {
    console.error("Error fetching ICS:", err);
    return {};
  }
}
