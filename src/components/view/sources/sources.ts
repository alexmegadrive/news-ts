import './sources.css';
import { AppView, INewsSourceItem } from '../appView';

class Sources {
  // public view: AppView;

  // constructor() {
  //   this.view = new AppView();
  // }

  public draw(data: Array<INewsSourceItem>) {
    // console.log('data  sources:', data);
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
    const sourcesContainer = document.querySelector('.sources') as HTMLElement;
    const filterArr: Array<string> = [];
    const filterCategory: Array<string> = [];

    data.forEach((item: INewsSourceItem): void => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
      const itemName = sourceClone.querySelector('.source__item-name') as HTMLElement;
      const itemEl = sourceClone.querySelector('.source__item') as HTMLElement;
      if (sourceClone && itemName && itemEl) {
        itemName.textContent = item.name;
        itemEl.setAttribute('data-source-id', item.id);
        itemEl.setAttribute('data-source-category', item.category);
        fragment.append(sourceClone);
      } else throw new Error('SourceClone error');
      let filterSymbol = item.name[0];
      if (!filterArr.includes(filterSymbol)) filterArr.push(filterSymbol);
      if (!filterCategory.includes(item.category)) filterCategory.push(item.category);
    });
    if (sourcesContainer) sourcesContainer.append(fragment);

    filterArr.sort((a: string, b: string): number => {
      if (a > b) return 1;
      if (b > a) return -1;
      return 0;
    });
    filterCategory.sort((a: string, b: string): number => {
      if (a > b) return 1;
      if (b > a) return -1;
      return 0;
    });
    this.drawFilterByName(filterArr);
    this.drawFilterByCategory(filterCategory);
    console.log('filterCategory :', filterCategory);
  }

  private drawFilterByName(data: Array<string>) {
    const sourcesNavContainer = document.querySelector('.sources-nav') as HTMLElement;
    const sourcesCategoryContainer = document.querySelector('.sources-categories') as HTMLElement;

    data.forEach((item: string): void => {
      let div = document.createElement('div') as HTMLElement;
      div.classList.add('source__item', 'filter__btn');
      div.innerText = item.toUpperCase();
      div.setAttribute('data-filter', item);
      div.addEventListener('click', (e: Event): void => {
        this.filterByName(item);
        sourcesNavContainer.querySelector('.active')?.classList.remove('active');
        sourcesCategoryContainer.querySelector('.active')?.classList.remove('active');
        div.classList.add('active');
      });
      sourcesNavContainer.append(div);
    });
  }

  public filterByName(query: string | null) {
    const sourcesContainer = document.querySelector('.sources') as HTMLElement;
    if (!sourcesContainer) throw Error('No sources container found');
    const SOURCES = Array.from(sourcesContainer.querySelectorAll<HTMLElement>('.source__item'));
    if (!sourcesContainer) throw Error('No sources html elements found');

    for (let el of SOURCES) {
      if (query && el.hasAttribute('data-source-id')) {
        const SYMBOL = el.getAttribute('data-source-id');
        if (query.toLowerCase()[0] === SYMBOL?.toLowerCase()[0]) el.hidden = false;
        else el.hidden = true;
      }
    }
    if (sourcesContainer.style.display !== 'flex') sourcesContainer.style.display = 'flex';
  }

  private drawFilterByCategory(data: Array<string>) {
    const sourcesCategoryContainer = document.querySelector('.sources-categories') as HTMLElement;
    const sourcesNavContainer = document.querySelector('.sources-nav') as HTMLElement;

    data.forEach((item: string): void => {
      let div = document.createElement('div') as HTMLElement;
      div.classList.add('source__item', 'filter__btn');
      div.innerText = item.toLowerCase();
      div.setAttribute('data-filter', item);
      div.addEventListener('click', (e: Event): void => {
        this.filterByCategory(item);
        sourcesNavContainer.querySelector('.active')?.classList.remove('active');
        sourcesCategoryContainer.querySelector('.active')?.classList.remove('active');
        div.classList.add('active');
      });
      sourcesCategoryContainer.append(div);
    });
  }

  public filterByCategory(query: string | null) {
    const sourcesContainer = document.querySelector('.sources') as HTMLElement;
    if (!sourcesContainer) throw Error('No sources container found');
    const SOURCES = Array.from(sourcesContainer.querySelectorAll<HTMLElement>('.source__item'));
    if (!sourcesContainer) throw Error('No sources html elements found');

    for (let el of SOURCES) {
      if (query && el.hasAttribute('data-source-category')) {
        const CATEGORY = el.getAttribute('data-source-category');
        if (query.toLowerCase()[0] === CATEGORY?.toLowerCase()[0]) el.hidden = false;
        else el.hidden = true;
      }
    }
    if (sourcesContainer.style.display !== 'flex') sourcesContainer.style.display = 'flex';
  }
}

export default Sources;
