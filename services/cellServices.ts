import type { contextType } from 'types/global'
import type { CellType, User } from 'types/resolvers'
const { CellSchema: Cell } = require('@models/Cell')
const { graphQLError } = require('@helpers/errorHandler')
const { StatusCodes } = require('http-status-codes')

class CellServices {
  async getCells(user: Partial<User>) {
    try {
      let cell: CellType[]

      //   cell = await Cell.find({ user: user.id });
      cell = await Cell.find({})

      // console.log(calculateCurrentProgress)
      return cell
    } catch (error: unknown) {
      if (error instanceof Error) {
        graphQLError(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
      } else {
        graphQLError(
          'An unexpected error occurred',
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      }
    }
  }

  async getCell(id: string) {
    // console.log(id)
    const cell = await Cell.findById({ _id: id })
    // console.log(cell)
    if (!cell)
      graphQLError(`There is no cell with id ${id}, please try again!!!`)
    return cell
  }

  async createCell(input: CellType, user: Partial<User>) {
    try {
      // await Goal.deleteMany()
      // console.log(input)
      const cell = new Cell({ ...input, createdBy: user.id })
      await cell.save()
      if (!cell)
        graphQLError(
          'An error occured creating cells, please try again',
          StatusCodes.INTERNAL_SERVER_ERROR
        )

      // console.log(cell)
      return {
        id: cell.id,
        cell, 
        success: true,
        message: 'Cell successfull added!',
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        graphQLError(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
      } else {
        graphQLError(
          'An unexpected error occurred',
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      }
    }
  }

  async updateCell(input: CellType, id: string, user: Partial<User>) {
    // console.log('entered update cell')
    try {
      const cell = await Cell.findByIdAndUpdate(
        { _id: id },
        {
          ...input,
        },
        {
          new: true,
          runValidators: true,
        }
      )

      if (!cell)
        graphQLError(
          'An error occured updating cells, please try again',
          StatusCodes.INTERNAL_SERVER_ERROR
        )

      // console.log('cell', cell)
      return {
        cell,
        user: user.id,
        success: true,
        message: 'Cell updated!',
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        graphQLError(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
      } else {
        graphQLError(
          'An unexpected error occurred',
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      }
    }
  }
  async deleteCell(id: string, user: Partial<User>) {
    try {
      if (!id) graphQLError('No cell id provided', StatusCodes.BAD_REQUEST)
      const cell = await Cell.findByIdAndDelete({ _id: id })
      // console.log(cell)
      // console.log('id', id)
      if (!cell)
        graphQLError(
          'Unknown id for selected cell!',
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      return {
        deleteCell: cell,
        success: true,
        message: 'Cell deleted!',
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        graphQLError(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
      } else {
        graphQLError(
          'An unexpected error occurred',
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      }
    }
  }
}

module.exports = new CellServices()
