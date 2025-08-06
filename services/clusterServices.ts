import type { contextType } from 'types/global'
import type { ClusterType, User } from 'types/resolvers'
const { ClusterSchema: Cluster} = require('@models/Cluster')
const { graphQLError } = require('@helpers/errorHandler')
const { StatusCodes } = require('http-status-codes')

class ClusterServices {
  async getClusters(user: Partial<User>) {
    try {
      let cluster: ClusterType[]

      //   cluster = await Cluster.find({ user: user.id });
      cluster = await Cluster.find({})

      // console.log(calculateCurrentProgress)
      return cluster
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

  async getCluster(id: string) {
    // console.log(id)
    const cluster = await Cluster.findById({ _id: id })
    // console.log(cluster)
    if (!cluster)
      graphQLError(`There is no cluster with id ${id}, please try again!!!`)
    return cluster
  }

  async createCluster(input: ClusterType, user: Partial<User>) {
    try {
      // console.log(input)
      const cluster = new Cluster({ ...input, createdBy: user.id })
      await cluster.save()
      if (!cluster)
        graphQLError(
          'An error occured creating clusters, please try again',
          StatusCodes.INTERNAL_SERVER_ERROR
        )

      // console.log(cluster)
      return {
        id: cluster.id,
        cluster,
        success: true,
        message: 'Cluster successfull added!',
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

  async updateCluster(input: ClusterType, id: string, user: Partial<User>) {
    // console.log('entered update cluster')
    try {
      const cluster = await Cluster.findByIdAndUpdate(
        { _id: id },
        {
          ...input
        },
        {
          new: true,
          runValidators: true,
        }
      )

      if (!cluster)
        graphQLError(
          'An error occured updating clusters, please try again',
          StatusCodes.INTERNAL_SERVER_ERROR
        )

      // console.log('cluster', cluster)
      return {
        cluster,
        user: user.id,
        success: true,
        message: 'Cluster updated!',
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
  async deleteCluster(id: string, user: Partial<User>) {
    try {
      if (!id) graphQLError('No cluster id provided', StatusCodes.BAD_REQUEST)
      const cluster = await Cluster.findByIdAndDelete({ _id: id })
      // console.log(cluster)
      // console.log('id', id)
      if (!cluster)
        graphQLError(
          'Unknown id for selected cluster!',
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      return {
        deleteCluster: cluster,
        success: true,
        message: 'Cluster deleted!',
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

module.exports = new ClusterServices()
