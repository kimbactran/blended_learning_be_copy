import { BooleanFieldOptional } from '@decorators/field.decorators';

export class VoteDto {
    @BooleanFieldOptional()
    isUpVote?: boolean;

    @BooleanFieldOptional()
    isDownVote?: boolean;
}
