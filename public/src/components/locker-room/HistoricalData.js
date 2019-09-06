import Component from '../Component.js';

class HistoricalData extends Component {
    onRender(dom) {

        const historicalData = this.props.historicalData;
        const historicalDataSpan = dom.querySelector('#historical-data-span');
        historicalDataSpan.textContent = historicalData;

    }
    
    renderHTML() {
        return /*html*/`
        <div>
            <span id="historical-data-span"></span>
        </div>
        `;
    }
}

export default HistoricalData;