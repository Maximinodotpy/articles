export interface Shortcut {
    keys: string;
    description: string;
    applicaton?: string;
}

export interface Application {
    name: string;
    description: string;
    shortcuts: Shortcut[];
}