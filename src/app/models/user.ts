import { Deserializable } from './deserializable.model';

export class User implements Deserializable {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    password: string;
    email: string;

    deserialize(input: any) {
        Object.assign(this, input);
        this.id = input.pk;
        return this;
    }
}
