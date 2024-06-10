import {
    $fileExplorer,
    $gameViewElement,
    $isEditor,
    $playgroundCode,
} from "../stores/playground";
import {
    $currentEditingFile,
    $project,
    $webContainer,
    type ProjectFile,
} from "../stores/project";

export const save = () => {
    if ($isEditor) {
        const currentEditingFile = $currentEditingFile.get();
        const project = $project.get();
        const projectFile = project.files[currentEditingFile] as ProjectFile;

        projectFile.saved = true;

        $webContainer.get()?.fs.writeFile(
            currentEditingFile,
            projectFile.file.contents.toString(),
        );

        $fileExplorer.get()?.syncFile(currentEditingFile);
    } // run code
    else {
        $gameViewElement.get()?.runCode($playgroundCode.get());
    }
};