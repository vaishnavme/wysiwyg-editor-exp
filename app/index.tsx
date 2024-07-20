import { Button, Modal } from "react-native";
import { Editor } from "@/components/Editor";
import { SafeAreaView, Text, View } from "react-native";
import { useState } from "react";
import { ProseEditor } from "@/components/ProseMirrorEditor";
import ModalHeader from "@/components/UI/ModalHeader";

const App = () => {
  const [showMarkdown, setShowMarkdown] = useState(false);
  const [showProseEditor, setShowProseEditor] = useState(false);

  return (
    <SafeAreaView>
      <Button title="Markdown Editor" onPress={() => setShowMarkdown(true)} />
      <Button title="Prose Editor" onPress={() => setShowProseEditor(true)} />
      <Modal
        visible={showMarkdown}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowMarkdown(false)}
      >
        <ModalHeader title="markdown editor" />

        <View
          style={{
            padding: 16,
          }}
        >
          <Editor />
        </View>
      </Modal>

      <Modal
        visible={showProseEditor}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowProseEditor(false)}
      >
        <ModalHeader title="Prose editor" />
        <View
          style={{
            padding: 16,
          }}
        >
          <ProseEditor />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default App;
