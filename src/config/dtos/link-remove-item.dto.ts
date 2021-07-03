import { ApiProperty } from "@nestjs/swagger";

export class LinkRemoveItem {
    @ApiProperty()
    entity: string;

    @ApiProperty()
    links: Array<string>;
}
