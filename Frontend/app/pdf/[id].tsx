import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Pdf from "react-native-pdf";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PDFScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();
  const router = useRouter();
  const pdfUrl = decodeURIComponent(url || "");
  const {title}  = useLocalSearchParams<{title :string}>()

  if (!pdfUrl) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No PDF URL provided.</Text>
      </View>
    );
  }

  const source = { uri: pdfUrl, cache: true };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={22} color="#fff" />
        </TouchableOpacity>
        <Text
          style={styles.headerTitle}
          numberOfLines={1}
        >
          {/* {decodeURIComponent(pdfUrl.split("/").pop() || "Document")} */}
          {title}
        </Text>
      </View>

      {/* PDF Viewer */}
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={(pages) => console.log(`Pages: ${pages}`)}
        onError={(err) => console.log("PDF Error:", err)}
        style={styles.pdf}
        renderActivityIndicator={() => (
          <ActivityIndicator size="large" color="#3B82F6" />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172b",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
    backgroundColor: "#1e293b",
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    flexShrink: 1,
  },
  pdf: {
    flex: 1,
    width: "100%",
  },
  errorText: {
    color: "#f87171",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
  },
});
