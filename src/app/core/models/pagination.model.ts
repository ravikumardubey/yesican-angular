import { constructAll } from 'src/app/core/utils/base.utils';

export interface PaginatedDataConstructObjType {
  count: number;
  next: any;
  previous: number;
  results: any[];
  resultsModel: any;
}

export class PaginatedData {
  count: number;
  next: any;
  previous: number;
  results: any[];

  constructor({
    count,
    next,
    previous,
    results,
    resultsModel,
  }: PaginatedDataConstructObjType) {
    this.count = count;
    this.next = next;
    this.previous = previous;
    this.results = constructAll(results, resultsModel);
  }
}
