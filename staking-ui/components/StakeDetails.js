//file with all staking details about contract


//How many tokens are in our wallet
//how many tokens are staked
//how many tokens have we earned


import { useMoralis, useWeb3Contract } from "react-moralis"
import { stakingAddress } from "../constants"
import { stakingAbi } from "../constants"
import { rewardTokenAbi } from "../constants"
import { rewardTokenAddress } from "../constants"
import {ethers} from "ethers"
import { useState, useEffect} from "react"




export default function StakeDetails() {

    const { account, isWeb3Enabled } = useMoralis()
    const [ rtBalance, setRtBalance ] = useState("0")
    const [ stakedBalance, setStakedBalance ] = useState("0")
    const [ earnedBalance, setEarnedBalance ] = useState("0")

    const { runContractFunction: getRtBalance } = useWeb3Contract({
        abi: rewardTokenAbi,
        contractAddress: rewardTokenAddress,
        functionName: "balanceOf",
        params: {
            account: account,
        },
    })

    const { runContractFunction: getStakedBalance } = useWeb3Contract({
        abi: stakingAbi,
        contractAddress: stakingAddress,
        functionName: "getStaked",
        params: {
            account: account,
        },
    })

    const { runContractFunction: getEarnedBalance} = useWeb3Contract({
        abi: stakingAbi,
        contractAddress: stakingAddress,
        functionName: "earned",
        params: {
            account: account,
        },
    })




    useEffect(() => {
        //effect   (update ui and get balances)
        if(isWeb3Enabled && account) {
        updateUiValues()
        }
    }, [account, isWeb3Enabled])

    async function updateUiValues() {
        const rtBalanceFromContract = (await getRtBalance({onError: (error) => console.log(error) })).toString()
        const formattedRtBalanceFromContract = ethers.utils.formatUnits(rtBalanceFromContract, 'ether')
        setRtBalance (formattedRtBalanceFromContract)

        const stakedFromContract = (await getStakedBalance({onError: (error) => console.log(error) })).toString()
        const formattedStakedFromContract = ethers.utils.formatUnits(stakedFromContract, 'ether')
        setStakedBalance (formattedStakedFromContract)

        const earnedFromContract = (await getEarnedBalance({onError: (error) => console.log(error) })).toString()
        const formattedEarnedFromContract = ethers.utils.formatUnits(earnedFromContract, 'ether')
        setEarnedBalance (formattedEarnedFromContract)
    }

    return(
    <div>
    <div> Your rewardToken Balance is: {rtBalance} </div>
    <div> Your Earned Balance is: {earnedBalance} </div>
    <div> Your staked Balance is: {stakedBalance} </div>
    </div>
    )
}