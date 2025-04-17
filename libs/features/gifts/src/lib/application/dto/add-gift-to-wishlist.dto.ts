import { IsNotEmpty, IsString } from 'class-validator';

export class AddGiftToWishlistDto {
  @IsString()
  @IsNotEmpty()
  public name!: string;

  @IsString()
  public description!: string;
}
