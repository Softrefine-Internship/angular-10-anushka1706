import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageModel } from './image.model';
import { Observable } from 'rxjs';
import { catchError, pipe, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
    private readonly API = "https://ng-gallery-dd1d8-default-rtdb.asia-southeast1.firebasedatabase.app/images";

    constructor(private http: HttpClient) { }

    fetchData():Observable<ImageModel[]> {
        return this.http.get<{ [key: string]: ImageModel }>(`${this.API}.json`).pipe(
          map((response) => {
            const images: ImageModel[] = [];
            for (const key in response) {
              if (response.hasOwnProperty(key)) {
                const imageObj: ImageModel = {
                  id: key,
                  imageUrl: response[key].imageUrl,
                  description: response[key].description,
                  tags: response[key].tags,
                  createdAt: response[key].createdAt,
                  updatedAt: response[key].updatedAt
                };
                images.push(imageObj);
              }
            }
            console.log(images)
            return images;
          })
        );
      }    

    saveData(data: ImageModel): Observable<{ name: string }> {
        const now = new Date().toISOString();
        data.createdAt = now;
        data.updatedAt = now;
        data.createdAt = now;
        data.updatedAt = now;
        return this.http.post<{ name: string }>(`${this.API}.json`, data);
    }
    fetchImageById(id: string): Observable<ImageModel> {
        return this.http.get<ImageModel>(`${this.API}/${id}.json`);
    }
    updateImage(id: string, data: ImageModel): Observable<void> {
        const now = new Date().toISOString();
        data.updatedAt = now;
        return this.http.put<void>(`${this.API}/${id}.json`, data);
    }
    deleteImage(id: string): Observable<void> {
        return this.http.delete<void>(`${this.API}/${id}.json`);
    }
}
