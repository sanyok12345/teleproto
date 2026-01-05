import { FileUnknown } from "./FileUnknown";
import { FilePartial } from "./FilePartial";
import { FileJpeg } from "./FileJpeg";
import { FileGif } from "./FileGif";
import { FilePng } from "./FilePng";
import { FilePdf } from "./FilePdf";
import { FileMp3 } from "./FileMp3";
import { FileMov } from "./FileMov";
import { FileMp4 } from "./FileMp4";
import { FileWebp } from "./FileWebp";

export type TypeFileType = FileUnknown | FilePartial | FileJpeg | FileGif | FilePng | FilePdf | FileMp3 | FileMov | FileMp4 | FileWebp;