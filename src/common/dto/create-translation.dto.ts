import { LanguageCode } from '@constants/index';
import { EnumField, StringField } from '@decorators/index';

export class CreateTranslationDto {
    @EnumField(() => LanguageCode)
    languageCode: LanguageCode;

    @StringField()
    text: string;
}
