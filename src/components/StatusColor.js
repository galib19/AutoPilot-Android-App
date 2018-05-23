import StatusConstant from '../constants/StatusConstant';
import color from '../constants/Color';

export function getStatusColor(colorName) {
    let colorNameLowerCase = colorName.toLowerCase();
    if (colorNameLowerCase === StatusConstant.NEW.toLowerCase()) {
        return color.NEW_STATUS_COLOR;
    } else if (colorNameLowerCase === StatusConstant.ACKNOWLEDGED.toLowerCase()) {
        return color.ACKNOWLEDGED_STATUS_COLOR;
    } else if (colorNameLowerCase === StatusConstant.ASSIGNED.toLowerCase()) {
        return color.ASSIGNED_STATUS_COLOR;
    } else if (colorNameLowerCase === StatusConstant.IN_PROGRESS.toLowerCase()) {
        return color.IN_PROGRESS_STATUS_COLOR;
    } else if (colorNameLowerCase === StatusConstant.COMPLETED.toLowerCase()) {
        return color.COMPLETED_STATUS_COLOR;
    } else {
        return color.FAILED_STATUS_COLOR;
    }
}