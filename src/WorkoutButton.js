import React from "react";
import { Button } from "@material-tailwind/react";

class WorkoutButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: new Array(props.workout.length).fill(false),
            dates: localStorage.getItem(this.props.day) ? JSON.parse(localStorage.getItem(this.props.day)) : []
            // localStorage.getItem(this.props.day) ? : []
        }
        // this.setState({dates: JSON.parse(this.state.dates)});
        console.log(this.state.dates);
    }

    cacheClick = async () => {
        var today = new Date();
        var date = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
        console.log(date);
        console.log(this.state.dates.length + " day streak!");

        var checked = false;
        for (let i=0; i<this.state.checked.length; i++){
            if (this.state.checked[i]){
                checked = true;
            }
        }
        var done = this.state.dates[this.state.dates.length-1] === date;
        if (!done && checked) {
            var copy = [...this.state.dates];
            copy.push(this.state.checked);
            copy.push(date);
            localStorage.setItem(this.props.day, JSON.stringify(copy));
            this.setState({dates: copy});
            alert("submitted!");
            this.handleClick(this.props.day);
        } else if (done) {
            alert("You already did this workout today!");
            console.log("Already logged a " + this.props.day + " workout today");
        } else {
            alert("You didn't do any of the exercises!");
            console.log("Didn't do any exercises");
        }
    }

    handleClick(day) {
        this.props.onClick(day);
    }

    checkClick(index){
        console.log(this.state.checked);
        let newChecked = this.state.checked.slice() //copy the array
        newChecked[index] = !newChecked[index] //execute the manipulations
        console.log(newChecked);
        this.setState({ 
            checked: newChecked
        });
    }

    render(){
        console.log(this.props.day + " collapsed value is " + this.props.collapsed);
       
        if (!this.props.collapsed){
            return (
                <div className="rounded-2xl text-center">
                    <Button onClick={() => this.handleClick(this.props.day)} className="p-4 my-2 border-2 border-black bg-red-200 text-3xl font-bold rounded-2xl">
                        + {this.props.day} day
                    </Button>
                </div>
                
            );
        } else {
            let index = [];
            for (let i=0; i<this.props.workout.length; i++){
                index.push(i);
            }
            const listItems = this.props.workout.map(
                (excersize, index) =>
                <li key={index} className=" normal-case text-left py-2">
                    {/* <Checkbox className="align-bottom" color="red" label={excersize}/> */}
                    <label>
                        <input 
                            type="checkbox" 
                            checked={this.state.checked[index]}
                            onChange= {() => this.checkClick(index)}
                            className = "scale-125"
                        />
                        <span className="ml-4">{excersize}</span>
                    </label>
                </li>
            );
            if (this.state.dates.length > 0) {
                var streak = (this.state.dates.length/2).toString() + " day streak ";
                streak = streak + "🔥";
            }
            return (
                <div className="grid grid-row-2 border-2 border-black py-fit rounded-2xl bg-red-100 md:w-auto">
                    <Button onClick={() => this.handleClick(this.props.day)} className="bg-red-200/50 hover:bg-red-200/75 rounded-2xl mt-4 mx-auto w-fit text-3xl font-bold">
                        - {this.props.day} day {this.state.num}
                        <div className="rounded-lg mt-2 mx-auto px-2 w-fit text-xl normal-case">
                            {streak}
                        </div>
                    </Button>

                    {/* <form class="w-full max-w-sm"> */}
                        <ul className='rounded-2xl font-normal bg-red-100 text-left pl-12' content>
                            {listItems}
                            <li className="">
                            </li>
                        </ul>
                                <input type="submit" value="Submit" onClick={this.cacheClick} className="block mx-auto my-4 bg-red-500/70 hover:bg-red-300/70 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"/>
                    {/* </form> */}
                </div>
            );
        }
    }
}

export default WorkoutButton;