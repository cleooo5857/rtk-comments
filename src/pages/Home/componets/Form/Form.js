import styled from 'styled-components';
import { flexCenter } from 'libs/styles/common';
import { useNavigate } from 'react-router-dom';
import useInput from 'hooks/useInput';
import { axiosInstance } from 'apis';
import { AuthApi } from 'apis/authApi';
import { TokenRepository } from 'repository/TokenRepository';

function HomeLoginFrom() {
    const naviate = useNavigate();

    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onClickLoginBtn = async (e) => {
        e.preventDefault();

        try {
            const res = await AuthApi.login({ email, password });
            console.log(res)
            if (res.status === 200) {
                TokenRepository.setToken(res.data.data.token);

                if (TokenRepository.getToken()) {
                    naviate('/todo', { replace: true });
                }
            }
        } catch (err) {
            // 만약 에러가난다면 에러를 이렇게 처리할거야
            // 사실 콘솔에러를 찍는 경우는 던질 이유가 없음
            console.error(err);
            alert(err);
            // 에러 바운더링(에러 핸들링)
        }
    };

    return (
        // form타입은 type지정안해주면 첫번째 버튼을 실행됨
        <S.Form onSubmit={onClickLoginBtn}>
            <div>
                <button type="button"></button> {/** form은 첫번째 버튼을 인식 */}
            </div>
            <input type="text" placeholder="아이디" value={email} onChange={onChangeEmail} />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={onChangePassword}
            />
            <button>로그인</button>
            {/** button 태그의 기본 타입은 ??
             *  1. button
             *  2. submit(o)
             */}
        </S.Form>
    );
}
export default HomeLoginFrom;

const Form = styled.form`
    ${flexCenter}
    flex-direction: column;
    & input {
        background-color: #fff;
        border-radius: 2rem;
        outline: none;
        border: #999;
        margin-bottom: 8px;
    }
`;

const S = {
    Form,
};
