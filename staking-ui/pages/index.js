import Header from '../components/Header'
import StakeDetails from '../components/StakeDetails'
import styles from '../styles/Home.module.css'
import StakeForm from '../components/StakeForm'

export default function Home() {
  return (
    <div className={styles.container}>
    <Header/>
    <StakeDetails/>
    <StakeForm/>
    </div>
  )
}
