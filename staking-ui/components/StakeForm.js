// staking ABI
//staking address
//how much to stake
// approve reward token


import { useWeb3Contract} from "react-moralis"
import { rewardTokenAbi, rewardTokenAddress, stakingAbi, stakingAddress } from "../constants"
import { Form } from "web3uikit"
import {ethers} from 'ethers'

export default function StakeForm() {
    const { runContractFunction } = useWeb3Contract()
    let approveOptions = {
        abi: rewardTokenAbi,
        contractAddress: rewardTokenAddress,
        functionName: "approve",

    }
    let stakeOptions = {
        abi: stakingAbi,
        contractAddress: stakingAddress,
        functionName: "stake",

    }

    async function handleStakeSubmit(data){
        const amountToApprove = data.data[0].inputResult
        approveOptions.params={
            amount:ethers.utils.parseUnits(amountToApprove, "ether").toString(),
            spender: stakingAddress,
        }
        console.log("approving...")
        const tx = await runContractFunction ({
            params: approveOptions,
            onError: (error) => console.log(error),
            onSuccess: () => {
                handleApproveSuccess(approveOptions.params.amount)
            },
        })
    }


    async function handleApproveSuccess(amountToStakeFormatted){
        stakeOptions.params = {
            amount: amountToStakeFormatted,
        }
        console.log(`staking ${stakeOptions.params.amount} JM Token`)
        const tx= await runContractFunction({
            params: stakeOptions,
            onError: (error) => console.log(error)

        })

        await tx.wait(1)
        console.log("Transaction has been confirmed in one block")
    }

    return(
        <div>
            <Form 

            onSubmit={handleStakeSubmit}
            data={
                [
                    {
                        imputWith:"50%",
                        name: "Amount to stake (in Eth)",
                        type: "number",
                        value: "",
                        key: "amountToStake"
                    },
                ]
            }
            title= "Stake your Crypto"
            >
           
            </Form>
        </div>
    )
}