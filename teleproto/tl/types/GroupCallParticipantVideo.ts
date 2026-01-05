import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeGroupCallParticipantVideoSourceGroup } from "./TypeGroupCallParticipantVideoSourceGroup";

export class GroupCallParticipantVideo extends TLObject {
    static CONSTRUCTOR_ID = 1735736008;
    static SUBCLASS_OF_ID = 4014389467;
    static className = "GroupCallParticipantVideo";
    static classType = "constructor";

    flags!: number;
    paused?: boolean;
    endpoint!: string;
    sourceGroups!: TypeGroupCallParticipantVideoSourceGroup[];
    audioSource?: number;

    constructor(args: { flags?: number, paused?: boolean, endpoint?: string, sourceGroups?: TypeGroupCallParticipantVideoSourceGroup[], audioSource?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.paused = args.paused;
        this.endpoint = args.endpoint!;
        this.sourceGroups = args.sourceGroups!;
        this.audioSource = args.audioSource;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1735736008, false);
        let flags = 0;
        if (this.paused) { flags |= 1 << 0; }
        if (this.audioSource !== undefined && this.audioSource !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.paused !== undefined && this.paused !== null) {
        }
        writer.tgWriteString(this.endpoint);
        writer.writeVector(this.sourceGroups, (item) => {
            writer.write(item.getBytes());
        });
        if (this.audioSource !== undefined && this.audioSource !== null) {
            writer.writeInt(this.audioSource);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): GroupCallParticipantVideo {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _paused = true;
            args.paused = _paused;
        } else {
            args.paused = false;
        }
        const _endpoint = reader.tgReadString();
        args.endpoint = _endpoint;
        const _sourceGroups = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.sourceGroups = _sourceGroups;
        if (args.flags & (1 << 1)) {
            const _audioSource = reader.readInt();
            args.audioSource = _audioSource;
        } else {
            args.audioSource = undefined;
        }
        return new GroupCallParticipantVideo(args);
    }
}