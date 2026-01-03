import React, {useState} from 'react';
import {BsSearch} from "react-icons/bs";
import {Box, IconButton, Input, InputGroup} from "@chakra-ui/react";
import {useNavigate, useParams} from "react-router";
import {routesParams} from "@/Enums/routesParams.ts";

export const SearchBar: React.FC = () => {
  const params = useParams()

  const [search, setSearch] = useState(params[routesParams.search] || '')
  const navigate = useNavigate()
  const navigateToSearch = () => {
    if (!search) {
      navigate('/')
      return
    }
    navigate(`/search/${search}`)
  }

  return (
    <Box display={"flex"} width={{md: '80%'}} mx={'auto'} mt={1}>
      <InputGroup startElement={<BsSearch color="white" />}>
        <Input
          fontSize={'xl'} placeholder="Search for..." size={"lg"}
          onChange={e => {
            setSearch(e.target.value)
          }} value={search}
          onKeyPress={(e) => e.key === 'Enter' && navigateToSearch()}
        />

      </InputGroup>
      <IconButton
        px={5}
        title="Search"
        marginLeft={15}
        aria-label="Download gif"
        onClick={() => navigateToSearch()}
      >
        Search <BsSearch color="white" />
      </IconButton>
    </Box>
  );
};
