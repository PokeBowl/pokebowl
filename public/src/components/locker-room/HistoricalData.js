import Component from '../Component.js';

class HistoricalData extends Component {
    onRender(dom) {

        const historicalData = this.props.historicalData;
        const historicalDataSpan = dom.querySelector('#historical-data-span');
        
        historicalData.map(string => {
            const paragraph = document.createElement('P');
            paragraph.textContent = string;
            historicalDataSpan.appendChild(paragraph);
        });
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