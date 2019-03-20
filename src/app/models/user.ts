import { Deserializable } from './deserializable.model';

export class User implements Deserializable {

    username: string;
    first_name: string;
    last_name: string;
    password: string;
    email: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}