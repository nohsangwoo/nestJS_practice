import { Injectable, NotFoundException } from '@nestjs/common';
// Movie라는 오브젝트에서 가져옴
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  //   모든 Movie리스트를 검색
  getAll(): Movie[] {
    return this.movies;
  }

  //   선택된 하나의 Movie를 검색
  //  전달받는 id는 어떤 type으로 전달받든 number type으로 변경해줌, 이하 동일
  getOne(id: number): Movie {
    //   +기호는 parsInt와 같음 string을 int로 변환
    const movie = this.movies.find(movie => movie.id === id);
    // movie데이터가 없으면 해당 에러메시지를 던짐
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  //   선택된 하나의 Movie를 삭제
  deleteOne(id: number) {
    //   해당 movie데이터를 검색후 없으면 getOne을 통해 에러메시지를 던지고
    this.getOne(id);
    // 이상이 없으면
    //  filter를 이용하여 특정 movie.id를 제외한 모든 movie를 뽑아옴
    this.movies = this.movies.filter(movie => movie.id !== id);
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
