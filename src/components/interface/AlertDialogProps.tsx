/**
 * Props for the AlertDialog component.
 * 
 * @property {string} message - The message to be displayed in the dialog box.
 * @property {string} navigateTo - The path to navigate to when the dialog action is confirmed.
 * @property {'alert' | 'inquiry'} type - The type of dialog, either 'alert' for warning messages or 'inquiry' for asking user input.
 */

interface AlertDialogProps {
    message: string;
    navigateTo: string;
    type: 'alert' | 'inquiry'
}


export default AlertDialogProps;