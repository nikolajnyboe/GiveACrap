import { TestBed, async } from '@angular/core/testing';
import { ItemsFilterPipe } from './items-filter.pipe';

beforeEach(() => {
  this.items = [
     {name: 'Cykel', description: 'Meget fin'},
     {name: 'Bil', description: 'Kører godt'},
     {name: 'Stol', description: 'Meget pæn'},
     {name: 'Spand', description: 'Den er tæt'},
  ];

  TestBed.configureTestingModule({
    declarations: [
      ItemsFilterPipe
    ],
  });
});

describe('Items search filter', () => {
  let pipe = new ItemsFilterPipe();

  it('Empty array returns empty array', () => {
    let result = pipe.transform([], 'Cykel');
    expect(result.length).toBe(0);
  });

  it('No search string returns all items', () => {
      let result = pipe.transform(this.items, '');
      expect(result.length).toBe(this.items.length);
  });

  it('Should find one based on name', () => {
    let result = pipe.transform(this.items, 'Cykel');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Cykel');
  });

  it('Should find one based on description', () => {
    let result = pipe.transform(this.items, 'tæt');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Spand');
  });

  it('Should find multiple based on description', () => {
    let result = pipe.transform(this.items, 'Meget');
    expect(result.length).toBe(2);
  });
});
