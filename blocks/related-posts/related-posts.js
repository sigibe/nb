import { loadBlock, buildBlock, decorateBlock, readBlockConfig,
} from '../../scripts/scripts.js';

function buildCarousel(config) {
    const postsCarousel = document.createElement('div');
    postsCarousel.innerHTML = `
    <div>
      <div>
        <picture>
            <source media="(min-width: 400px)" type="image/webp" srcset="/media_1b4e25ce45be4e1dafab5a032e1fb1fbf97e7270a.png?width=2000&amp;format=webply&amp;optimize=medium">
            <source type="image/webp" srcset="/media_1b4e25ce45be4e1dafab5a032e1fb1fbf97e7270a.png?width=750&amp;format=webply&amp;optimize=medium">
            <source media="(min-width: 400px)" srcset="/media_1b4e25ce45be4e1dafab5a032e1fb1fbf97e7270a.png?width=2000&amp;format=png&amp;optimize=medium">
            <img loading="lazy" alt="" src="/media_1b4e25ce45be4e1dafab5a032e1fb1fbf97e7270a.png?width=750&amp;format=png&amp;optimize=medium"></picture>
      </div>
      <div>How a first-time personal loan application works</div>
    </div>
    <div>
      <div>
        <picture>
            <source media="(min-width: 400px)" type="image/webp" srcset="/media_1b4e25ce45be4e1dafab5a032e1fb1fbf97e7270a.png?width=2000&amp;format=webply&amp;optimize=medium">
            <source type="image/webp" srcset="/media_1b4e25ce45be4e1dafab5a032e1fb1fbf97e7270a.png?width=750&amp;format=webply&amp;optimize=medium">
            <source media="(min-width: 400px)" srcset="/media_1b4e25ce45be4e1dafab5a032e1fb1fbf97e7270a.png?width=2000&amp;format=png&amp;optimize=medium">
            <img loading="lazy" alt="" src="/media_1b4e25ce45be4e1dafab5a032e1fb1fbf97e7270a.png?width=750&amp;format=png&amp;optimize=medium"></picture>
      </div>
      <div>How a first-time personal loan application works</div>
    </div>
    <div>
      <div>
        <picture>
            <source media="(min-width: 400px)" type="image/webp" srcset="/media_1b4e25ce45be4e1dafab5a032e1fb1fbf97e7270a.png?width=2000&amp;format=webply&amp;optimize=medium">
            <source type="image/webp" srcset="/media_1b4e25ce45be4e1dafab5a032e1fb1fbf97e7270a.png?width=750&amp;format=webply&amp;optimize=medium">
            <source media="(min-width: 400px)" srcset="/media_1b4e25ce45be4e1dafab5a032e1fb1fbf97e7270a.png?width=2000&amp;format=png&amp;optimize=medium">
            <img loading="lazy" alt="" src="/media_1b4e25ce45be4e1dafab5a032e1fb1fbf97e7270a.png?width=750&amp;format=png&amp;optimize=medium"></picture>
      </div>
      <div>How a first-time personal loan application works</div>
    </div>
    `;
    return postsCarousel;
}

export default async function decorate(block) {
    const blockCfg = readBlockConfig(block);
    const carousel = buildCarousel(blockCfg);
    const multiImageCarousel = buildBlock('carousel', [carousel]);
    multiImageCarousel.classList.add('multiImageCarousel');
    block.appendChild(multiImageCarousel);
    decorateBlock(multiImageCarousel);
    loadBlock(multiImageCarousel);
    block.innerHTML = '';
    block.append(multiImageCarousel);
    return block;
}
