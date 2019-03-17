import { Deserializable } from './deserializable.model';

export class Application implements Deserializable {

    id: number;
    name: string;
    icon: string;
    has_controls: boolean;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

}

export class CrashedApp extends Application {
    alert_category: string;

    constructor(alert_category) {
        super();
        this.alert_category = alert_category;
    }
}
