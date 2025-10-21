
import { syncAssignment } from './notifications';
import { addAssignment } from './storage';

 type Assignment = {
  id: string;
  title: string;
  subject: string;
  isoDate: string; // ISO datetime string
};
export async function testAssignmentSetup() {
  const now = new Date();

  const assignment: Assignment = {
    id: 'test-assignment-1',
    title: 'Math Homework',
    subject: 'Mathematics',
    isoDate: new Date(now.setHours(15, 0, 0, 0)).toISOString(), // 3 PM IST
  };

  await addAssignment(assignment);
  await syncAssignment(assignment);

  console.log('✅ Test assignment scheduled:', assignment);
}
