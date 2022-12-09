import { css } from 'styled-components'

export const ModalBackground = css`
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0, 0.7);
`

export const flexCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const title = css`
    font-size: 48px;
    line-height: 16px;
    font-weight: bold;
`

export const textarea = css`
    width: 50%;
	height: 50px;
	padding: 10px;
	box-sizing: border-box;
	border: solid 2px #1E90FF;
	border-radius: 5px;
	font-size: 16px;
	resize: both;
`

export const btn = css`
    padding: 5px 10px;
    border-radius: 2px;
    font-weight: bold;
    width: 100px;
    height: 50px;
    font-size: 21px;
    color: white;
    background: #4C8FFB;
    border: 1px #3079ED solid;
    cursor: pointer;
`