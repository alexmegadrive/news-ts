import './sources.css';
import {AppView,INewsSourceItem } from '../appView';


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
    const filterArr:Array<string> = [];

    data.forEach((item: INewsSourceItem): void => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
      const itemName = sourceClone.querySelector('.source__item-name') as HTMLElement;
      const itemEl = sourceClone.querySelector('.source__item') as HTMLElement;
      if (sourceClone && itemName && itemEl) {
        itemName.textContent = item.name;
        itemEl.setAttribute('data-source-id', item.id);
        fragment.append(sourceClone);
      } else throw new Error('SourceClone error');
      let filterSymbol = item.name[0]
      if (filterArr.indexOf(filterSymbol) < 0) filterArr.push(filterSymbol)
    });
    if (sourcesContainer) sourcesContainer.append(fragment);
   
    filterArr.sort((a:string,b:string):number => {
        if (a>b) return 1
        if (b>a) return -1
        return 0
    })
    this.drawFilter(filterArr)

  }

  public filterBy(filter:string | null) {
    const sourcesContainer = document.querySelector('.sources') as HTMLElement;
    if (!sourcesContainer) throw Error ('No sources container found')
    const SOURCES = Array.from(sourcesContainer.querySelectorAll<HTMLElement>('.source__item'))
    if (!sourcesContainer) throw Error ('No sources html elements found')

    for (let el of SOURCES ) {
        if (filter && el.hasAttribute('data-source-id')) {
            const SYMBOL = el.getAttribute('data-source-id')
            if (filter.toLowerCase()[0] === SYMBOL?.toLowerCase()[0]) el.hidden = false
            else el.hidden = true
        }
    }
    if (sourcesContainer.style.display !== 'flex') sourcesContainer.style.display = 'flex'
  }

  private drawFilter(data:Array<string>) {

    const filterContainer = document.querySelector('.filter') as HTMLElement;
    data.forEach((item: string): void => {
        let div = document.createElement('div') as HTMLElement
        div.classList.add('source__item', 'filter__btn')
        div.innerText = item.toUpperCase()
        div.setAttribute('data-filter', item) 
        div.addEventListener('click', (e:Event):void => {
            this.filterBy(item)
        })
        filterContainer.append(div)
    })

  }
}

export default Sources;
