export function constructAll(list: any, model: any, extra = null): any[] {
  if (!Array.isArray(list)) {
    return [];
  }
  return list.map((item: any) => {
    if (extra) {
      return new model(item, extra);
    } else {
      return new model(item);
    }
  });
}
