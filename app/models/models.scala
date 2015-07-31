package models

import anorm._
import play.api.Play.current
import play.api.db.DB

case class Item(id: Option[Long],description: String,status: Boolean)
object Item{
  val sql: SqlQuery = SQL("select * from todos order by id asc")

  def getAll: List[Item] = DB.withConnection(
    implicit connection => sql().map( row =>
      Item(row[Option[Long]]("id"),row[String]("description"),
      row[Boolean]("status"))
    ).toList
  )

  import anorm.RowParser
  val todoParser: RowParser[Item] = {
    import anorm.~
    import anorm.SqlParser._

    long("id") ~
    str("description") ~
    bool("status") map {
      case id ~ description ~ status =>
        Item(Some(id),description,status)
    }
  }

  def findId(id: Long): Item = DB.withConnection {
    implicit connection =>
      val sqlQuery = SQL(
      s"""
         select * from todos t
         where t.id = ${id};
       """
      )

      sqlQuery.single().as(todoParser).get
  }

  def insert(item: Item): Option[Long] =
    DB.withConnection { implicit  connection =>
      SQL("""insert into todos values ({id},{description},{status})""").on(
      "id" -> item.id,
      "description" -> item.description,
      "status" -> item.status
      ).executeInsert()
    }


  def update(item: Item):Boolean =
    DB.withConnection { implicit connection =>
      val rows = SQL(
        """update todos
          set description = {description},
        status = {status}
        where id = {id}""").on(
      "id" -> item.id.get,
      "description" -> item.description,
      "status" -> item.status
        ).executeUpdate()
      rows == 1
    }

  def delete(itemId: Long): Boolean =
    DB.withConnection { implicit  connection =>
      val delRows = SQL("""delete from todos where id = {id}""").on(
      "id" -> itemId
      ).executeUpdate()
      delRows == 1
    }

}

