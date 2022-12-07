import './sources.css';

interface INewsSourceItem {
    [key: string]: string;
}

class Sources {
    draw(data: Array<INewsSourceItem>) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        const sourcesContainer =  document.querySelector('.sources') as HTMLElement;
        data.forEach((item: INewsSourceItem): void => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
            let itemName = sourceClone.querySelector('.source__item-name') as HTMLElement;
            let itemEl = sourceClone.querySelector('.source__item') as HTMLElement;
            if (sourceClone && itemName && itemEl) {
                itemName.textContent = item.name;
                itemEl.setAttribute('data-source-id', item.id);
                fragment.append(sourceClone);
            } else throw new Error('SourceClone error');
        });
        if (sourcesContainer) sourcesContainer.append(fragment);
    }
}

export default Sources;
