# Todos schema

# ---!Ups


CREATE TABLE todos (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  description VARCHAR(225),
  status BOOLEAN,
  PRIMARY KEY (id)
);

INSERT INTO todos VALUES(1,'Go shopping',FALSE );
INSERT INTO todos VALUES(2,'Go fishing',FALSE );
# ---!Downs
DROP TABLE todos;
