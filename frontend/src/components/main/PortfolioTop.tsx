import { forwardRef, Ref } from 'react'
import { SectionWrap } from '../common/MainObject'
import { styled } from '@stitches/react'
import iconReact from '../../assets/icon_react-wordmark.svg'
import iconSpring from '../../assets/icon_spring-wordmark.svg'
import styles from './PortfolioTop.module.css'

const PortfolioTop = forwardRef(
  (_props, ref: Ref<HTMLElement>) => {
    return (
      <SectionWrap className={`${styles.sectionWrap} first`} ref={ref}>
        <h1 className={styles.sectionTitle}>
          환영합니다!
        </h1>
        <h3 className={styles.sectionSubTitle}>
          웹 개발자로써 성공적인 웹 사이트를 구축하기 위해..
        </h3>
        <Divs>
          <Div>
            <Svg src={iconReact} />
            <h1 className={styles.divTitle}>프론트 엔드</h1>
            <p className={styles.divP}>
              현재 페이지는 <br />
              React로 개발되었습니다.
            </p>
          </Div>
          <Div>
            <Svg src={iconSpring} />
            <h1 className={styles.divTitle}>백엔드 기술</h1>
            <p className={styles.divP}>
              백엔드 기술로는 자바의 스프링부트 프레임워크를 활용합니다.
            </p>
          </Div>
          <Div>
            
          </Div>
        </Divs>
      </SectionWrap>
    );
  });

  const Divs = styled('div', {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 300px)',
    gridTemplateRows: '400px',
    columnGap: '2rem',
    marginTop: '4rem'
  });

  const Div = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0px 6px 12px #888888',
    background: 'white',
  });

  const Svg = styled('img', {
    margin: '2rem 0',
    width: '50%',
    height: '50%',
  });


export default PortfolioTop;