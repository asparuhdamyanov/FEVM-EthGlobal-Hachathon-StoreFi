/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export type StateResultStruct = {
  name: string;
  votesBiden: BigNumberish;
  votesTrump: BigNumberish;
  stateSeats: BigNumberish;
};

export type StateResultStructOutput = [string, BigNumber, BigNumber, number] & {
  name: string;
  votesBiden: BigNumber;
  votesTrump: BigNumber;
  stateSeats: number;
};

export interface USElectionInterface extends ethers.utils.Interface {
  functions: {
    "BIDEN()": FunctionFragment;
    "TRUMP()": FunctionFragment;
    "electionEnded()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "resultsSubmitted(string)": FunctionFragment;
    "seats(uint8)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "submitStateResult((string,uint256,uint256,uint8))": FunctionFragment;
    "currentLeader()": FunctionFragment;
    "endElection()": FunctionFragment;
    "getPresidentSeats(uint8)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "BIDEN", values?: undefined): string;
  encodeFunctionData(functionFragment: "TRUMP", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "electionEnded",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "resultsSubmitted",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "seats", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "submitStateResult",
    values: [StateResultStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "currentLeader",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "endElection",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPresidentSeats",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "BIDEN", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TRUMP", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "electionEnded",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "resultsSubmitted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "seats", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submitStateResult",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentLeader",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "endElection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPresidentSeats",
    data: BytesLike
  ): Result;

  events: {
    "LogElectionEnded(uint256)": EventFragment;
    "LogStateResult(uint8,uint8,string)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "LogElectionEnded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogStateResult"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type LogElectionEndedEvent = TypedEvent<
  [BigNumber],
  { winner: BigNumber }
>;

export type LogElectionEndedEventFilter =
  TypedEventFilter<LogElectionEndedEvent>;

export type LogStateResultEvent = TypedEvent<
  [number, number, string],
  { winner: number; stateSeats: number; state: string }
>;

export type LogStateResultEventFilter = TypedEventFilter<LogStateResultEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface USElection extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: USElectionInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    BIDEN(overrides?: CallOverrides): Promise<[number]>;

    TRUMP(overrides?: CallOverrides): Promise<[number]>;

    electionEnded(overrides?: CallOverrides): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    resultsSubmitted(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    seats(arg0: BigNumberish, overrides?: CallOverrides): Promise<[number]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    submitStateResult(
      result: StateResultStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    currentLeader(overrides?: CallOverrides): Promise<[number]>;

    endElection(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getPresidentSeats(
      presidentId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  BIDEN(overrides?: CallOverrides): Promise<number>;

  TRUMP(overrides?: CallOverrides): Promise<number>;

  electionEnded(overrides?: CallOverrides): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  resultsSubmitted(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  seats(arg0: BigNumberish, overrides?: CallOverrides): Promise<number>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  submitStateResult(
    result: StateResultStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  currentLeader(overrides?: CallOverrides): Promise<number>;

  endElection(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getPresidentSeats(
    presidentId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    BIDEN(overrides?: CallOverrides): Promise<number>;

    TRUMP(overrides?: CallOverrides): Promise<number>;

    electionEnded(overrides?: CallOverrides): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    resultsSubmitted(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    seats(arg0: BigNumberish, overrides?: CallOverrides): Promise<number>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    submitStateResult(
      result: StateResultStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    currentLeader(overrides?: CallOverrides): Promise<number>;

    endElection(overrides?: CallOverrides): Promise<void>;

    getPresidentSeats(
      presidentId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "LogElectionEnded(uint256)"(winner?: null): LogElectionEndedEventFilter;
    LogElectionEnded(winner?: null): LogElectionEndedEventFilter;

    "LogStateResult(uint8,uint8,string)"(
      winner?: BigNumberish | null,
      stateSeats?: null,
      state?: null
    ): LogStateResultEventFilter;
    LogStateResult(
      winner?: BigNumberish | null,
      stateSeats?: null,
      state?: null
    ): LogStateResultEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    BIDEN(overrides?: CallOverrides): Promise<BigNumber>;

    TRUMP(overrides?: CallOverrides): Promise<BigNumber>;

    electionEnded(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    resultsSubmitted(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    seats(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    submitStateResult(
      result: StateResultStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    currentLeader(overrides?: CallOverrides): Promise<BigNumber>;

    endElection(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getPresidentSeats(
      presidentId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    BIDEN(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TRUMP(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    electionEnded(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    resultsSubmitted(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    seats(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    submitStateResult(
      result: StateResultStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    currentLeader(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    endElection(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getPresidentSeats(
      presidentId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
