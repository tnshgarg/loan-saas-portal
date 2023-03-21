import {
    Button,
    Colors,
    ControlGroup,
    HTMLSelect,
    InputGroup,
    Navbar,
    NavbarGroup,
    Text,
  } from "@blueprintjs/core";

export function Pagination({
    pageOptions,
    pageIndex,
    gotoPage,
    canPreviousPage,
    nextPage,
    canNextPage,
    pageCount,
    previousPage,
    pageSize,
    setPageSize,
  }) {
    return (
      <div className="pagination">
        <Navbar
          minimal
          style={{ color: Colors.GRAY1, boxShadow: "none", padding: 0 }}
        >
          <NavbarGroup>
            <small>Rows per Page</small>
            <HTMLSelect
              small
              minimal
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[3, 10, 20, 30, 40, 50].map((pageSize) => (
                <option
                  key={pageSize}
                  value={pageSize}
                  style={{ fontSize: "0.8em" }}
                >
                  {pageSize}
                </option>
              ))}
            </HTMLSelect>
          </NavbarGroup>
          <NavbarGroup>
            <Button
              minimal
              icon="double-chevron-left"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            />
            <Button
              minimal
              icon="chevron-left"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            />
            <NavbarGroup>
              <small>
                <strong>
                  <ControlGroup>
                    <Text>&nbsp;&nbsp; Page &nbsp;&nbsp; </Text>
                    <InputGroup
                      type={"text"}
                      style={{ width: "2em", height: "1.3em", display: "inline" }}
                      placeholder={pageIndex + 1}
                      onBlur={(e) => {
                        console.log(e);
                        gotoPage(parseInt(e.target.value) - 1);
                      }}
                      rightElement={<span></span>}
                    />
                    <Text>&nbsp;&nbsp; of {pageOptions.length}</Text>
                  </ControlGroup>
                </strong>{" "}
              </small>
            </NavbarGroup>
            <Button
              minimal
              icon="chevron-right"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            />
            <Button
              minimal
              icon="double-chevron-right"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            />
          </NavbarGroup>
        </Navbar>
      </div>
    );
  }