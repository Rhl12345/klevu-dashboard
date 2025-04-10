export interface iAccountConnectionProps {
  appName: string; // Name of the connected application
  isConnected: boolean; // Connection status
  onConnect: () => void; // Callback for Connect button
  onDisconnect?: () => void; // Callback for Disconnect button
  termsText?: string; // Custom terms and conditions text
  wrapperClassName?: string; // Custom classes for the outer wrapper
  appNameClassName?: string; // Custom classes for the app name text
  statusClassName?: string; // Custom classes for the connection status text
  buttonWrapperClassName?: string; // Custom classes for the button wrapper
  connectButtonClassName?: string; // Custom classes for the connect button
  disconnectButtonClassName?: string; // Custom classes for the disconnect button
  termsTextClassName?: string; // Custom classes for the terms text
}
