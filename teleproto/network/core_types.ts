export const kDcShift = 10000;

export const kConfigDcShift = 0x01;
export const kLogoutDcShift = 0x02;
export const kUpdaterDcShift = 0x03;
export const kExportDcShift = 0x04;
export const kExportMediaDcShift = 0x05;

export const kMaxMediaDcCount = 0x10;

export const kBaseDownloadDcShift = 0x10;

export const kBaseUploadDcShift = 0x20;

export type ShiftedDcId = number;

export function bareDcId(shiftedDcId: ShiftedDcId): number {
    return shiftedDcId % kDcShift;
}

export function shiftDcId(dcId: number, shift: number): ShiftedDcId {
    return dcId + kDcShift * shift;
}

export function getDcIdShift(shiftedDcId: ShiftedDcId): number {
    return Math.floor(shiftedDcId / kDcShift);
}

export function downloadDcId(dcId: number, index: number): ShiftedDcId {
    return shiftDcId(dcId, kBaseDownloadDcShift + index);
}

export function uploadDcId(dcId: number, index: number): ShiftedDcId {
    return shiftDcId(dcId, kBaseUploadDcShift + index);
}

export function isDownloadDcId(shiftedDcId: ShiftedDcId): boolean {
    const shift = getDcIdShift(shiftedDcId);
    return (
        shift >= kBaseDownloadDcShift &&
        shift < kBaseDownloadDcShift + kMaxMediaDcCount
    );
}

export function isUploadDcId(shiftedDcId: ShiftedDcId): boolean {
    const shift = getDcIdShift(shiftedDcId);
    return (
        shift >= kBaseUploadDcShift &&
        shift < kBaseUploadDcShift + kMaxMediaDcCount
    );
}
