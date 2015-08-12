package controllers

import java.io.InputStreamReader

import com.google.inject.Inject
import models.Item
import play.api.Play
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.functional.syntax._
import play.api.libs.json._
import play.api.mvc.{Action, Controller}

import javax.script.ScriptEngineManager
import jdk.nashorn.api.scripting.NashornScriptEngine


/**
 * Created by diem on 24/07/2015.
 */
class Todos @Inject()(val messagesApi: MessagesApi)(implicit app: play.api.Application) extends Controller with I18nSupport {

  implicit val itemWriteJson = (
    (__ \ "id").writeNullable[Long] and
      (__ \ "description").write[String] and
      (__ \ "status").write[Boolean]
    )(unlift(Item.unapply))

  implicit val itemReadJson = (
    (__ \ "id").readNullable[Long] and
      (__ \ "description").read[String] and
      (__ \ "status").read[Boolean])(Item.apply _)

  def index = Action { implicit request =>

    val nashorn = new ScriptEngineManager().getEngineByName("nashorn").asInstanceOf[NashornScriptEngine]

    val vendors = Play.application.resourceAsStream("public/javascripts/vendors.js")
    val serverSideComponent = Play.application.resourceAsStream("public/javascripts/serverSide.js")

    val vendorReader = new InputStreamReader(vendors.get)
    val serverSideComponentReader = new InputStreamReader(serverSideComponent.get)

    nashorn.eval(
      """
        |window = this;
        |
        |console = {
        | log: print,
        | info: print,
        | error:print
        |};
      """.stripMargin)

    val data = Json.toJson(Item.getAll)

    nashorn.eval(
      s"""
         |todos = $data
    """.stripMargin)

    nashorn.eval(vendorReader)
    val content = nashorn.eval(serverSideComponentReader).toString
    val html = play.twirl.api.Html(content)

    Ok(views.html.items.list(html))
  }

  def list = Action {
    Ok(Json.toJson(Item.getAll))
  }

  def delete(id: Long) = Action {
    Item.delete(id) match {
      case true => Ok
      case false => BadRequest
    }
  }

  def save = Action(parse.json) { request =>
    request.body.validate[Item] match {
      case JsError(err) => BadRequest
      case JsSuccess(item, _) =>
        Ok(JsNumber(Item.insert(item).get.toInt))
    }
  }

  def edit = Action(parse.json) { request =>
    request.body.validate[Item] match {
      case JsError(err) => BadRequest
      case JsSuccess(item, _) =>
        Item.update(item)
        Ok
    }
  }
}

