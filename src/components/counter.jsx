import "./counter.css";
import { useState } from "react";
import range from 'js-range';

const Counter = () => {
    
    const [rangeValues, setRangeValues] = useState({
        min: null,
        max: null,
    })

    const [rangeArr, setRangeArr] = useState({
        range: []
    })

    const [rngNum, setRngNum] = useState(null)

    const handleChange = (e) => {
        setRangeValues({
          ...rangeValues,
          [e.target.name]: e.target.value,
        });
    };

    const roll = () => {
        if(rangeValues.min && rangeValues.max) {            
            createRangeArr()
        
            setTimeout(() => {
                let spinnerList = document.querySelector('.jackpot-spinner-list')
                let numberDecider = document.querySelector('.jackpot-number-decider')
                let spinnerHeight = spinnerList.offsetHeight

                numberDecider.style.display = 'block'
    
                spinnerList.animate([
                    { top: `${-spinnerHeight + 270}px`  },
                    { top: '-20px' }
                ], {
                    // timing options
                    duration: 1000,
                    direction: "reverse",
                });
                setTimeout(() => {
                    spinnerList.animate([
                        { top: `${-spinnerHeight + 270}px`  },
                        { top: '-20px' }
                    ], {
                        // timing options
                        duration: 1500,
                        direction: "reverse",
                    });
                },1000)
                setTimeout(() => {
                    spinnerList.animate([
                        { top: `${-spinnerHeight + 270}px`  },
                        { top: '-20px' }
                    ], {
                        // timing options
                        duration: 2000,
                        direction: "reverse",
                    });
                },2500)
                setTimeout(() => {
                    spinnerList.animate([
                        { top: `${-spinnerHeight + 270}px`  },
                        { top: '-20px' }
                    ], {
                        // timing options
                        duration: 2500,
                        direction: "reverse",
                    });
                },4500)
                setTimeout(() => {
                    spinnerList.animate([
                        { top: `${(-spinnerHeight / 2) + 108 }px`  },
                        { top: '-20px' }
                    ], {
                        // timing options
                        duration: 3000,
                        direction: "reverse",
                        fill: 'forwards'
                    });
                },6000)
            }, 100)
        }
    }

    const createRangeArr = () => {
        let array = range(parseInt(rangeValues.min, 10), parseInt(rangeValues.max, 10) + 1)
        let randomNum = array[Math.floor(Math.random()*array.length)]

        array = shuffleArray(array)

        if(array.length > 20) {
            array = array_move(array, array.indexOf(randomNum), 0)
            array = array.slice(0, 20)
        } else {
            while (array.length < 20) {
                array.push(array[Math.floor(Math.random()*array.length)])
            }
        }

        array = array_move(array, array.indexOf(randomNum), Math.floor(array.length / 2))

        setRngNum(randomNum)
        setRangeArr({
            range: array
        })
    }

    const shuffleArray = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array
    }

    const array_move = (arr, old_index, new_index) => {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr;
    };

    const isOdd = (num) => { 
        if(num % 2 === 0) {
            return false
        } else {
            return true
        }
    }

    const renderArr = () => {
        if(rangeArr.range.length > 0) {
            let renderList = []

            for (let i = 0; i < rangeArr.range.length; i++){
                renderList.push(<li className="jackpot-number" id={`jackpot-number-${rangeArr.range[i]}`} key={i}>{rangeArr.range[i]}</li>)
            }
            return renderList
        }
    }

    

    return (
        <div className="counter-container">
            <h1>Jackpot Roller</h1>
            <div className="jackpot-inputs-container">
                <h2>Choose range of numbers:</h2>
                <div className="jackpot-inputs">
                    <div>
                        <label htmlFor="min">Min:</label>
                        <input onChange={(e) => handleChange(e)} type="number" name="min" />
                    </div>
                    <div>
                        <label htmlFor="max">Max:</label>
                        <input onChange={(e) => handleChange(e)} type="number" name="max" />
                    </div>
                </div>
                <button className="jackpot-roller" onClick={() => roll()}>Spin</button>
            </div>
            <div className="jackpot-results-container">
                <ul className="jackpot-spinner-list">
                    {renderArr()}
                </ul>
                <div className="jackpot-number-decider"></div>
            </div>
            <div>{rngNum}</div>
        </div>
    )
}

export default Counter;
