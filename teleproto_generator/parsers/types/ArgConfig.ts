export interface ArgConfig {
    isVector: boolean;
    isFlag: boolean;
    skipConstructorId: boolean;
    flagName: string | null;
    flagIndex: number;
    flagIndicator: boolean;
    type: string;
    useVectorId: boolean | null;
    isOptionalTS?: boolean;
}
