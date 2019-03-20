import { Deserializable } from './deserializable.model';

export class ControlType implements Deserializable {
    id: number;
    type_name: string;
    icon: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
