import React from 'react';

import styled from 'styled-components';

import usePromise from "../../hooks/usePromise"
import { getPeople } from "../../utils/api"

import Spinner from "../Spinner"
import { SectionWithTitle, Center } from "../../utils/mixins"

const Wrapper = styled.div`
	${SectionWithTitle};
`

const HorScroller = styled.div`
	display: flex;
	flex-wrap: wrap;
	
	width: 100%;
	height: auto;
	padding: 10px;
  
	.item {
		width: 100px;
		height: 100px;
		margin-right: 10px;
		margin-bottom: 10px;
  	
		img {
			width: 100px;
			height: 100px;
		}
	}
`


const KnownPeople = (props) => {
	const key = props.data.fileName
	const getPeopleIfFile = async () => {
		console.log('getPeopleIfFile', key)
		if (key) return getPeople (key);
		return null;
	}
	const [loading, resolved, error] = usePromise (getPeopleIfFile, [key])
	console.log({ resolved })

	let body = null
	if (loading) body = <Center><Spinner.inline /></Center>
	else if (error) {
		console.error(error);
		body = <div>Error occured!</div>
	}
	else if (!resolved) body = <div>Nothing to show</div>
	else {
		//body =
		//	<HorScroller>
		//		{resolved.map(src => {
		//			return (
		//				<div className="item">
		//					<img src={src} key={src} />
		//				</div>
		//			)
		//		})}
		//	</HorScroller>
	}

	return (
		<Wrapper>
			<div className={'__section-title'}>Known People</div>
			<div className="__section-body">
				{body}
			</div>
		</Wrapper>
	)
}

export default KnownPeople;
