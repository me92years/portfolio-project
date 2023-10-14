import { forwardRef, Ref } from 'react'
import { SectionWrap } from "../../common/MainObject";
import styles from './PortfolioProject.module.css'

const PortfolioProject = forwardRef(
  (_props, ref: Ref<HTMLElement>) => {

    return (
      <SectionWrap className={styles.sectionWrap} ref={ref}>
        
      </SectionWrap>
    );
  });

export default PortfolioProject;