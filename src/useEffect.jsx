import React, {useCallback, useEffect, useState} from "react";

export const UseEffect = () => {
	const [count, setCount] = useState(1)
	const [visible, setVisible] = useState(true)

	if (visible) {
		return (
			<div>
				<button onClick={() => setCount((c) => c + 1)}>+</button>
				<button onClick={() => setVisible(false)}>hiden</button>
				{/*<HookCounter value={count}/>*/}
				{/*<ClassCounter value={count}/>*/}
				{/*<Notification/>*/}
				<PlanetInfo id={count}/>
			</div>
		)
	} else {
		return (
			<button onClick={() => setVisible(true)}>show</button>
		)
	}
}

const getPlanet = (id) => {
	return fetch(`https://swapi.dev/api/planets/${id}`)
		.then(res => res.json())
		.then(data => data)
}

const useRequest = (request) => {
	const [dataState, setDataState] = useState({
		data: null,
		loading: true,
		error: null
	})

	useEffect(() => {
		setDataState({
			data: null,
			loading: true,
			error: null
		})
		let cancelled = false
		request()
			.then(data => !cancelled && setDataState({
				data,
				loading: false,
				error: null
			}))
			.catch(err=> !cancelled && setDataState({
				data: null,
				loading: false,
				error: err
			}))
		return () => cancelled = true
	}, [request])

	return dataState
}

const usePlanetInfo = (id) => {
	const request = useCallback(() => getPlanet(id), [id])
	return useRequest(request)
}

const PlanetInfo = ({id}) => {

	let {data, loading, error} = usePlanetInfo(id)

	if (error) {
		return <p>error</p>
	}
	if (loading) {
		return <p>Loading...</p>
	}

	return (
		<p>{id} - {data && data.name}</p>
	)
}

const HookCounter = ({value}) => {
	// useEffect(()=>{
	// 	console.log('mount')
	// }, [])
	// useEffect(()=>{
	// 	console.log('mount')
	// })

	useEffect(() => () => console.log('unmount'), [])

	return <div>{value}</div>
}

class ClassCounter extends React.Component {
	componentDidMount() {
		console.log('class:mount')
	}

	componentDidUpdate(props) {
		console.log('class: update')
	}

	componentWillUnmount() {
		console.log('class: unmount')
	}

	render() {
		return <div>{this.props.value}</div>
	}
}

const Notification = () => {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const timeout = setTimeout(() => setVisible(true), 2000)
		return () => clearTimeout(timeout)
	}, [])

	return visible && <p>Hello</p>
}
