import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {UseEffect} from "./useEffect";

const App = () => {
	return (
		<div>
			{/*<HookSwitcher/>*/}
			<UseEffect/>
		</div>
	)
}

const HookSwitcher = () => {
	const [color, setColor] = useState('white')
	const [fontSize, setFontSize] = useState(10)

	const [person, setPerson] = useState({
		firstName: 'ivan',
		lastName: 'Kirov'
	})

	return (
		<div style={{
			padding: '10px',
			backgroundColor: color,
			fontSize: `${fontSize}px`
		}}>
			<button onClick={() => setColor('white')}>Light</button>
			<button onClick={() => setColor('grey')}>Dark</button>
			Hello World!
			<button onClick={() => setFontSize(s => s + 2)}>+</button>
			<button onClick={() => setFontSize(s => s - 2)}>-</button>
			<div style={{backgroundColor: 'tomato'}}>
				{/*{console.log(person.firstName, person.lastName)}*/}
				<button onClick={()=> setPerson(person=>{
					return {...person, firstName: 'Hihi'}
				})}>go</button>
				<button onClick={()=> console.log(person)}>go2</button>
				<button onClick={()=> console.log(person)}>go3</button>
			</div>
		</div>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>,
	document.getElementById('root')
);
