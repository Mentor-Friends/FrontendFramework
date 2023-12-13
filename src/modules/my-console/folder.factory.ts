import * as tsccs from "tsccs";
import * as CompositionConst from "../../constants/composition.const";

export default class FolderFactory {
  initializeBoomFolders() {
    // this.getAllFolders().then((x: any) => {
    //   console.log(x);
    // });
  }

  async getAllFolders() {
    return await tsccs.GetCompositionList(
      CompositionConst.captureBoomGPTComposition
    );
  }
}
