import React, { useEffect, useState } from 'react'
import { UserTableRole, UserTableRoleOption } from './UserManagementStyles'
import {
  changeUserActivation,
  changeUserRole,
  getAllRoles,
  getAllUsers,
} from '../../utils/api/users'
import PopupWindow from '../../components/PopupWindow/PopupWindow'
import Button from '../../components/Button/Button'
import Search from '../../components/Search/Search'
import Pagination from '../../components/Pagination/Pagination'
import { decodeToken } from 'react-jwt'
import {
  Control,
  Controller,
  Table,
  TableBody,
  TableCell,
  TableCellButton,
  TableHead,
  TableHeader,
  TableRow,
  Title,
  PopupButtonWrapper,
  LoaderWrapper,
} from '../../utils/styles/generalStyles'
import { Blocks } from 'react-loader-spinner'

export const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [changedUser, setChangedUser] = useState(null)
  const [loggedUserId, setLoggedUserId] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [pages, setPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingRoles, setLoadingRoles] = useState(true)

  const [error, setError] = useState('')

  const fetchUsers = async () => {
    setLoading(true)

    try {
      const userData = await getAllUsers(currentPage, pageSize, searchTerm)
      if (userData.success) {
        setPages(userData.totalPages)
        setUsers(userData.users)
      }
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [searchTerm, currentPage])

  useEffect(() => {
    const fetchRoles = async () => {
      setLoadingRoles(true)

      try {
        const roleData = await getAllRoles()
        roleData.sort((a, b) => a.roleId - b.roleId)
        setRoles(roleData)
      } catch (error) {
        setError(error.message || 'An error occurred while fetching role data.')
      } finally {
        setLoadingRoles(false)
      }
    }

    fetchRoles()

    const jwt = localStorage.getItem('jwt')
    const data = decodeToken(jwt)
    setLoggedUserId(data.userId)
  }, [])

  const handleRoleChange = async (userId, newRoleId) => {
    const currentUser = users.find((user) => user.id === userId)

    if (currentUser.roleId != newRoleId) {
      await changeUserRole(userId, newRoleId)
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, roleId: newRoleId } : user,
        ),
      )
    }
  }

  const changeActivation = async (userId) => {
    await changeUserActivation(userId)
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, active: !user.active } : user,
      ),
    )
  }

  return (
    <>
      {error.length === 0 && (
        <>
          <Title>User Management</Title>
          <Controller>
            <Control></Control>
            <Control>
              <Pagination
                pages={pages}
                currentPage={currentPage}
                prevCall={async () => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1)
                  }
                }}
                firstCall={async () => {
                  setCurrentPage(1)
                }}
                nextCall={async () => {
                  if (currentPage < pages) {
                    setCurrentPage(currentPage + 1)
                  }
                }}
                lastCall={async () => {
                  setCurrentPage(pages)
                }}
                withSelect
                onSelectChange={async (size) => {
                  setPageSize(size)
                  setCurrentPage(1)
                }}
              />
            </Control>
            <Control>
              <Search
                placeholder="Search"
                onCancel={() => {
                  setCurrentPage(1)
                  setSearchTerm('')
                }}
                search={(term) => {
                  setCurrentPage(1)
                  setSearchTerm(term)
                }}
                showCancel={searchTerm.trim().length > 0}
              />
            </Control>
          </Controller>

          {loading ? (
            <LoaderWrapper>
              <Blocks
                height="150"
                width="150"
                color="#4fa94d"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
              />
            </LoaderWrapper>
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Full name</TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Role</TableHeader>
                    <TableHeader>Active</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          {user.firstName} {user.lastName}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {user.id == loggedUserId ? (
                            <>
                              {
                                roles.find((role) => role.id === user.roleId)
                                  ?.name
                              }
                            </>
                          ) : (
                            <>
                              {!loadingRoles && (
                                <UserTableRole
                                  defaultValue={user.roleId}
                                  onChange={(e) =>
                                    handleRoleChange(
                                      user.id,
                                      parseInt(e.target.value),
                                    )
                                  }
                                >
                                  {roles.map((role) => {
                                    return (
                                      <UserTableRoleOption
                                        key={role.id}
                                        value={role.id}
                                      >
                                        {role.name}
                                      </UserTableRoleOption>
                                    )
                                  })}
                                </UserTableRole>
                              )}
                            </>
                          )}
                        </TableCell>
                        {user.id == loggedUserId ? (
                          <>
                            <TableCell>Active</TableCell>
                          </>
                        ) : (
                          <>
                            <TableCellButton
                              onClick={() => {
                                setChangedUser(user.id)
                              }}
                            >
                              {user.active ? 'Deactivate' : 'Activate'}
                            </TableCellButton>
                          </>
                        )}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </>
          )}

          {changedUser !== null && (
            <PopupWindow
              title={
                users.find((user) => user.id === changedUser).active
                  ? 'Deactivate User?'
                  : 'Activate User?'
              }
              text={`Are you sure you want to ${
                users.find((user) => user.id === changedUser).active
                  ? 'deactivate'
                  : 'activate'
              } user ${
                users.find((user) => user.id === changedUser).firstName
              } ${users.find((user) => user.id === changedUser).lastName}?`}
              onClose={() => {
                setChangedUser(null)
              }}
            >
              <PopupButtonWrapper>
                <Button
                  buttonText="Yes"
                  onClick={async () => {
                    await changeActivation(changedUser)
                    setChangedUser(null)
                  }}
                />
                <Button
                  buttonText="No"
                  onClick={() => {
                    setChangedUser(null)
                  }}
                />
              </PopupButtonWrapper>
            </PopupWindow>
          )}
        </>
      )}

      {error.length > 0 && (
        <PopupWindow
          title={'There was an error'}
          text={error}
          onClose={async () => {
            setError('')
            setSearchTerm('')
            setCurrentPage(1)
          }}
        >
          <Button
            buttonText="Close"
            onClick={async () => {
              setError('')
              setSearchTerm('')
              setCurrentPage(1)
            }}
          />
        </PopupWindow>
      )}
    </>
  )
}
